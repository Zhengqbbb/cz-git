/** basic site info */
export const name = 'cz-git'
export const site = 'https://cz-git.qbb.sh'
export const siteCN = 'https://cz-git.qbb.sh/zh/'
export const logo = 'https://cz-git.qbb.sh/images/logo.png'
export const keywords = 'cz-git, czg, cli, commitizen, commitizen cli,commitizen adapter, git-cz'
export const descriptionEN
  = 'Support OpenAI, and more engineered, lightweight, customizable, standard output format commitizen adapter and Git commit CLI'
export const descriptionCN
  = '支持 OpenAI 自动生成描述，且工程性更强，轻量级，高度自定义，输出标准格式的 commitizen 适配器与 git commit 命令行工具。'

/** social links */
export const ogTitle = 'cz-git - commitizen adapter and CLI'
export const ogImg = 'https://cz-git.qbb.sh/images/og.png'
export const ogImgCN = 'https://cz-git.qbb.sh/images/og-zh.png'
export const github = 'https://github.com/Zhengqbbb/cz-git'
export const npm = 'https://www.npmjs.com/package/cz-git'
export const twitter = 'https://twitter.com/zhengqbbb'

/** package info */
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const { version } = require('cz-git/package.json')

/** site search console  */
export const googleVerify = 'j6cNWewUj3QcJBpdv48t67XoDxdlKPQ6dwKgXg9Nigo'
export const baiduVerify = 'code-GZMUSi21Xe'

/* PWA runtime caching urlPattern regular expressions */
/* eslint-disable prefer-regex-literals */
export const githubSourceContentRegex = new RegExp('^https://(((raw|user-images|camo).githubusercontent.com))/.*', 'i')
export const googleFontRegex = new RegExp('^https://fonts.googleapis.com/.*', 'i')
export const googleStaticFontRegex = new RegExp('^https://fonts.gstatic.com/.*', 'i')
export const jsdelivrCDNRegex = new RegExp('^https://cdn.jsdelivr.net/.*', 'i')
