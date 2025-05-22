const btnConfig = {
  login: 'a:has-text("密码登录/注册")',
  username: '#username',
  password: '#password',
  loginBtn: '#loginbtn2',
  ticketGeneral: 'a[href="/tickets"]',
  ticketAuction: 'a[href="/pai"]',
  ticketEp: 'a[href="/goods/index/114"]',
  group: 'a.ny_choice:has-text("演出组合")',
  aOfTarget: 'li.gs_2t > a',
  aOfTargetEp: 'li.gs_2 > a',
  aOfTargetXPath: 'xpath=../preceding-sibling::li[contains(@class, "gs_1")][1]',
  imgTargetElement: 'img'
}
const ticketLink = new Map([
  ['GENERAL', 'a[href="/tickets"]'],
  ['AUCTION', 'a[href="/pai"]'],
  ['EP', 'a[href="/goods/index/114"]']
])
const groupLink = {
  BEJ48: "a[href='?brand_id=2']",
  GNZ48: "a[href='?brand_id=3']",
  CKG48: "a[href='?brand_id=5']",
  CGT48: "a[href='?brand_id=15']"
}

export { btnConfig, ticketLink, groupLink }