scopes =

  mobileApp:
    name:"Mobile App"
    # from https://play.google.com/store/apps
    select: ["Books & Reference","Business","Comics","Communication","Education","Entertainment","Finance","Health & Fitness","Libraries & Demo","Lifestyle","Live Wallpaper","Media & Video","Medical","Music & Audio","News & Magazines","Personalisation","Photography","Productivity","Shopping","Social","Sports","Tools","Transport","Travel & Local","Weather","Widgets"]

    #from http://www.peopleperhour.com/
    children:
      design:
        name:"Design"
        select:"Logos, Wireframes, Web Pages, Icons / Badges"
        children: [] #features
      development:
        name:"Development"
        select:["iOS", "Android", "PhoneGap", "React Native"]
        children: [] #features
      content:
        name:"Content"
        select: ["Marketing copy", "Sales Collateral", "SEO Articles", "Blog Posts", "Infographics"]
        children: [] #pages
      promotion:
        name:"Promotion"
        select: ["Google Adwords", "Facebook pages", "Twitter followers", "Link building", "Forum submissions", "Press releases"]

  mobileGame:
    name:"Mobile Game"
    # from https://play.google.com/store/apps
    select: ["Action","Adventure","Arcade","Board","Card","Casino","Casual","Educational","Music","Puzzle","Racing","Role Playing","Simulation","Sports","Strategy","Trivia","Word"]
    children:
      design:scopes.mobileApp.children.design
      "development.select":["Unity", "iOS", "Android"]
      content:scopes.mobileApp.children.content
      promotion:scopes.mobileApp.children.promotion

  webSite:
    name:"Web Site"
    select:scopes.mobileApp.select
    children:
      design:scopes.mobileApp.children.design
      "development.select":["HTML", "CSS", "WordPress", "Joomla", "Magento"]
      content:scopes.mobileApp.children.content
      promotion:scopes.mobileApp.children.promotion

  webApp:
    name:"Web App"
    select:scopes.mobileApp.children
    children:
      design:scopes.mobileApp.children.design
      "development.select":["PHP / ASP", "HTML", "CSS", "Angular", "Node", "React", "Ruby on Rails"]
      content:scopes.mobileApp.children.content
      promotion:scopes.mobileApp.children.promotion



