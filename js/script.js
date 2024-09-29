'use strict';

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';


  /* ####################################### */
  /* FUNCTION TO FIND THE ARTICILE AFTER CLICK ON THE ELEMENT */
  /* ####################################### */

  const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();
    // console.log('Link was clicked!');
    // console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE]  add class 'active' to the clicked link */

    // console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const getLinkAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const findArticle = document.querySelector(getLinkAttribute);
    // console.log('findAtricle:', findArticle);

    /* [DONE] add class 'active' to the correct article */

    findArticle.classList.add('active');
  };

  /* ####################################### */
  /* FUNCTION TO GENERATE ARTICLE TITLE LIST */
  /* ####################################### */

  const generateTitleLinks = function (customSelector = '') {
    /* [DONE] remove contents of titleList */
    // console.log('rightNowCustomSelector:', customSelector);
    document.querySelector(optTitleListSelector).innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    // console.log('articlesWithCustom:', articles);

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';

      /* [DONE] insert link into html variable */

      html = html + linkHTML;
    }

    document.querySelector(optTitleListSelector).innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  /* ####################################### */
  /* FUNCTION TO CALCULATE OCCURENCES  */
  /* ####################################### */

  const calculateTagsParams = function (tags) {
    
    const params = {
      max : 0,
      min : 999999
    };

    console.log(tags);

    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' times');

      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;
  };

  /* ####################################### */
  /* FUNCTION TO CALCULATE TAG CLASS  */
  /* ####################################### */

  const calculateTagClass = function (count, params) {
    console.log(count);

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const precentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(precentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;
  };

  /* ####################################### */
  /* FUNCTION TO GENERATE TAG LIST */
  /* ####################################### */

  const generateTags = function () {
    
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {

      /* [DONE] find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      // console.log('tagsWrapper:', tagsWrapper);
    
      /* [DONE] make html variable with empty string */

      let html = '';
    
      /* [DONE] get tags from data-tags attribute */

      const tags = article.getAttribute('data-tags');
      // console.log('tags:', tags);
    
      /* [DONE] split tags into array */

      const tagsArray = tags.split(' ');
      // console.log('tagsArray:', tagsArray);

      /* [DONE] START LOOP: for each tag */

      for (let tag of tagsArray) {
    
        /* [DONE] generate HTML of the link */

        const linkHTML =
          '<li><a href="#tag-' +
          tag +
          '">' +
          tag +
        '</a></li>';
        // console.log('linkHTML:', linkHTML);
    
        /* [DONE] add generated code to html variable */

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        html = html + linkHTML;
    
        /* END LOOP: for each tag */

      }
    
      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;
    
    /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a> ';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  };

  generateTags();

  /* ####################################### */
  /* FUNCTION TO MAKE CLICK HANDLER AND LISTENERS FOR TAG */
  /* ####################################### */

  const tagClickHandler = function(event){

    /* [DONE] prevent default action for this event */

    event.preventDefault();
    // console.log('Link was clicked!');
  
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  
    const clickedElement = this;
    // console.log('Event:', event);

    /* [DONE]  make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    // console.log('href:', href);
  
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    // console.log('tag:', tag);
  
    /* [DONE] find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    // console.log('activeTagLinks:', activeTagLinks);
  
    /* [DONE] START LOOP: for each active tag link */

    for (let activeTagLink of activeTagLinks) {
      
      /* [DONE] remove class active */
      
      activeTagLink.classList.remove('active');
    }
  
    /* [DONE] END LOOP: for each active tag link */
  
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    // console.log('allTagLinks:', sameTagLinks);

  
    /* [DONE] START LOOP: for each found tag link */

    for (let tagLink of sameTagLinks) {

      /* [DONE] add class active */

      tagLink.classList.add('active');
    };
  
    /* [DONE] END LOOP: for each found tag link */
  
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  
  const addClickListenersToTags = function (){
    /* [DONE] find all links to tags */

    const links = document.querySelectorAll('a[href^="#tag-"]');
  
    /* [DONE] START LOOP: for each link */

    for (let link of links) {

      /* [DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);
    }
  
    /* [DONE]  END LOOP: for each link */
  };
  
  addClickListenersToTags();
  
  /* ####################################### */
  /* FUNCTION TO GENERATE AUTHOR LIST */
  /* ####################################### */

  const generateAuthors = function () {

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {

      /* [DONE] find tags wrapper */

      const authorWrapper = article.querySelector(optArticleAuthorSelector);
    
      /* [DONE] make html variable with empty string */

      let html = '';
    
      /* [DONE] get tags from data-tags attribute */

      const author = article.getAttribute('data-author');
    
      /* [DONE] generate HTML of the link */

      const linkHTML =
          'by <a href="#author-' +
          author +
          '">' +
          author +
        '</a>';
  
      /* [DONE] add generated code to html variable */

      html = html + linkHTML;
    
      /* [DONE] insert HTML of all the links into the tags wrapper */

      authorWrapper.innerHTML = html;
    
    /* [DONE] END LOOP: for every article: */
    }
  };

  generateAuthors();

  /* ####################################### */
  /* FUNCTION TO MAKE CLICK HANDLER AND LISTENERS FOR AUTHOR */
  /* ####################################### */

  const authorClickHandler = function(event){

    /* [DONE] prevent default action for this event */

    event.preventDefault();
  
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  
    const clickedElement = this;

    /* [DONE]  make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
  
    /* [DONE] make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');
  
    /* [DONE] find all author links with class active */

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  
    /* [DONE] START LOOP: for each active author link */

    for (let activeAuthorLink of activeAuthorLinks) {
      
      /* [DONE] remove class active */
      
      activeAuthorLink.classList.remove('active');
    }
  
    /* [DONE] END LOOP: for each active author link */
  
    /* [DONE] find all author links with "href" attribute equal to the "href" constant */

    const sameAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
    /* [DONE] START LOOP: for each found tag link */

    for (let authorLink of sameAuthorLinks) {

      /* [DONE] add class active */

      authorLink.classList.add('active');
    };
  
    /* [DONE] END LOOP: for each found author link */
  
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');
  };
  
  const addClickListenersToAuthors = function (){
    /* [DONE] find all links to authors */

    const authors = document.querySelectorAll('a[href^="#author-"]');
  
    /* [DONE] START LOOP: for each link */

    for (let author of authors) {

      /* [DONE] add authorClickHandler as event listener for that link */

      author.addEventListener('click', authorClickHandler);
    }
  
    /* [DONE]  END LOOP: for each author */
  };
  
  addClickListenersToAuthors();





}
