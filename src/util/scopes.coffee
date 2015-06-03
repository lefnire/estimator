scopes = mobileApp:{}, mobileGame:{}, webSite:{}, webApp:{}

scopes.mobileApp =
  name:"Mobile App"
  # from https://play.google.com/store/apps
  select: ["Books & Reference","Business","Comics","Communication","Education","Entertainment","Finance","Health & Fitness","Libraries & Demo","Lifestyle","Live Wallpaper","Media & Video","Medical","Music & Audio","News & Magazines","Personalisation","Photography","Productivity","Shopping","Social","Sports","Tools","Transport","Travel & Local","Weather","Widgets"]
  #from http://www.peopleperhour.com/
  children:
    design:
      name:"Design"
      select:"Logos, Wireframes, Web Pages, Icons / Badges"
      children: {} # Features
    development:
      name:"Development"
      select:["iOS", "Android", "PhoneGap", "React Native"]
      children: {} # Features
    promotion:
      name:"Promotion"
      select: ["Google Adwords", "Facebook pages", "Twitter followers", "Link building", "Forum submissions", "Press releases"]
      children: {}

scopes.mobileGame =
  name:"Mobile Game"
  # from https://play.google.com/store/apps
  select: ["Action","Adventure","Arcade","Board","Card","Casino","Casual","Educational","Music","Puzzle","Racing","Role Playing","Simulation","Sports","Strategy","Trivia","Word"]
  children:
    design:scopes.mobileApp.children.design
    development:scopes.mobileApp.children.development
    promotion:scopes.mobileApp.children.promotion
scopes.mobileGame.children.development.select = ["Unity", "iOS", "Android"]

scopes.webSite =
  name:"Web Site"
  select:scopes.mobileApp.select
  children:
    design:scopes.mobileApp.children.design
    development:scopes.mobileApp.children.development
    content:
      name:"Content"
      select: ["Marketing copy", "Sales Collateral", "SEO Articles", "Blog Posts", "Infographics"]
      children: {} # Pages
    promotion:scopes.mobileApp.children.promotion
scopes.webSite.children.development.select = ["HTML", "CSS", "WordPress", "Joomla", "Magento"]

scopes.webApp =
  name:"Web App"
  select:scopes.mobileApp.children
  children:
    design:scopes.mobileApp.children.design
    development:scopes.mobileApp.children.development
    content:scopes.webSite.children.content
    promotion:scopes.mobileApp.children.promotion
scopes.webApp.children.development.select = ["PHP / ASP", "HTML", "CSS", "Angular", "Node", "React", "Ruby on Rails"]

module.exports = scopes



