module.exports = ({ file }) => ({
  plugins: (file && file.extname === 'scss' ? [require('stylelint')] : []).concat([
    require('autoprefixer'),
    require('postcss-clean'),
    require('postcss-flexbugs-fixes'),
  ]),
});
