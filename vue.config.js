module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/todo-list-vue/'
      : '/',
  outputDir: 'docs'
}
