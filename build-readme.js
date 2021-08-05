const path = require('path')
const fs = require('fs')
const fsp = fs.promises

const toc = require('markdown-toc')
const documentation = require('documentation')

const newReadMe = path.join(__dirname, 'README.md')
const readMe = path.join(__dirname, '.README.md')

const readContents = async (file) => fsp.readFile(file, { encoding: 'utf8', flag: 'r' });

const injectJsDoc = async ( readMe ) => {
  const START_COMMENT_FENCE = '<!--START_SECTION:jsdoc-->'
  const END_COMMENT_FENCE = '<!--END_SECTION:jsdoc-->'
  const listRegExp = new RegExp(
    `${START_COMMENT_FENCE}[\\s\\S]+${END_COMMENT_FENCE}`
  )
  const meta = await documentation.build(
    [path.join(__dirname, 'src', 'index.js')],
    {}
  )
  let docs = await documentation.formats.md(meta,{ markdownToc: false })
  docs = docs.replace(/^(#.)/gm, '#$1')
  return readMe.replace(listRegExp, '## API\n\n' + docs)
}

const injectFileFencePosts = async ( readMe, options = { log : false } ) => {
  options.log = options.log || false;
  const logFileName = ( {log} ) => ( fileName ) => {
    if ( log ) console.log( 'File name = ', fileName )
    return fileName
  }
  const START_LOAD_FILE_FENCE = (file = '(.*)') => `<!--START_SECTION:file:${file}-->`
  const END_LOAD_FILE_FENCE = (file = '(.*)') => `<!--END_SECTION:file:${file}-->`
  const loadFileRegExp = new RegExp(START_LOAD_FILE_FENCE(),'g')
  const fileFencePostsRegExp = ( file ) => {
    return new RegExp(`${ START_LOAD_FILE_FENCE( file ) }[\\s\\S]+${ END_LOAD_FILE_FENCE( file ) }`)
  }
  // const readMeContent = await readContents( readMe )
  // const files = [...readMeContent.matchAll( loadFileRegExp ) ].reduce( ( acc, [,file ] ) => { acc.push( file ); return acc }, [] ).map( logFileName(options) );
  const files = [...readMe.matchAll( loadFileRegExp ) ].reduce( ( acc, [,file ] ) => { acc.push( file ); return acc }, [] ).map( logFileName(options) );
  const contentMap = await Promise.all( files.map( async ( file ) => {
    const content = await readContents( path.join( __dirname, file ) );
    return { file, content };
  } ) )
  return contentMap.reduce(
    ( acc, { file, content } ) => acc.replace( fileFencePostsRegExp( file ), START_LOAD_FILE_FENCE(file) + '\n' + content + '\n' + END_LOAD_FILE_FENCE(file) ),
    readMe
  );
}

const injectToc = async ( readMe ) => {
  const { content } = toc( readMe, {} );
  const START_COMMENT_FENCE = '<!--START_SECTION:toc-->'
  const END_COMMENT_FENCE = '<!--END_SECTION:toc-->'
  const listRegExp = new RegExp(
    `${START_COMMENT_FENCE}[\\s\\S]+${END_COMMENT_FENCE}`
  )
  return readMe.replace(listRegExp, START_COMMENT_FENCE + '\n\n## Table of contents\n' + content + '\n\n' + END_COMMENT_FENCE );
}

(async () => {
  let newReadMeContent = '';
  const readMeContent = await readContents( readMe );
  newReadMeContent = await injectJsDoc( readMeContent )
  newReadMeContent = await injectFileFencePosts( newReadMeContent );
  newReadMeContent = await injectToc( newReadMeContent );
  await fsp.writeFile(newReadMe, newReadMeContent, { encoding: 'utf-8' })
})()
