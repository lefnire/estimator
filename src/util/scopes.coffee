_ = require('lodash');

scopes = mobileApp:{}, mobileGame:{}, webSite:{}, webApp:{}

scopes.webSite =
  name:"Web Site"
  # Any level can have either/or/both tags & children. Tags are meta about a task, children are the task itself. Eg, {tag:'Angular',child:'User Profile'} would tell customers how long a task takes on a particular platform
  # from https://play.google.com/store/apps
  tags: ["Books & Reference","Business","Comics","Communication","Education","Entertainment","Finance","Health & Fitness","Libraries & Demo","Lifestyle","Live Wallpaper","Media & Video","Medical","Music & Audio","News & Magazines","Personalisation","Photography","Productivity","Shopping","Social","Sports","Tools","Transport","Travel & Local","Weather","Widgets"]
  children:
    development:
      name:"Development"
      #from http://www.peopleperhour.com/
      tags: ["HTML","CSS","WordPress","Joomla","Magento"]
      children: [
        # feature or page -level, custom normalized entries
        {name:"(example) Calendar Widget"}
        {name:"(example) About Page"}
        {name:"(example) User Profile"}
      ]
    design:
      name:"Design"
      tags: ["Illustrator", "Gimp", "PhotoShop"]
      children: [
        {name:"Logos"}
        {name:"Wireframes"}
        {name:"Web Pages"}
        {name:"Icons / Badges"}
      ]
    promotion:
      name:"Promotion"
      children: [
        {name:"Google Adwords"}
        {name:"Facebook pages"}
        {name:"Twitter followers"}
        {name:"Link building"}
        {name:"Forum submissions"}
        {name:"Press releases"}
      ]
    content:
      name:"Content"
      tags: ["Marketing copy", "Sales Collateral", "SEO Articles", "Blog Posts", "Infographics"]
      children: [] # Pages ?


scopes.webApp =
  name:"Web App"
  tags:scopes.webSite.tags
  children:
    design:scopes.webSite.children.design
    content:scopes.webSite.children.content
    promotion:scopes.webSite.children.promotion
    development:
      name: "Development"
      tags: ["PHP / ASP","HTML","CSS","Angular","Node","React","Ruby on Rails"]
      children: [
        {name:"(example) Authentication"}
        {name:'(example) API'}
        {name:'(example) Shopping Cart'}
      ]

scopes.mobileApp =
  name:"Mobile App"
  tags:scopes.webSite.tags
  children:
    design:scopes.webSite.children.design
    promotion:scopes.webSite.children.promotion
    development:
      name:"Development"
      tags: ["iOS","Android","PhoneGap","React Native"]
      children: [
        {name: "(example) Side Menu"}
        {name: "(example) Calendar Selector"}
        {name: "(example) Login Screen"}
      ]


scopes.mobileGame =
  name:"Mobile Game"
  tags: ["Action","Adventure","Arcade","Board","Card","Casino","Casual","Educational","Music","Puzzle","Racing","Role Playing","Simulation","Sports","Strategy","Trivia","Word"]
  children:
    design:scopes.webSite.children.design
    promotion:scopes.webSite.children.promotion
    development:
      name:'Development'
      tags: ["Unity","iOS","Android"]
      children: [
        {name: "(example) Scoreboard"}
        {name: "(example) Invite Facebook friends"}
      ]

module.exports = scopes



