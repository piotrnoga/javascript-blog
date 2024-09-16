'use strict';

/* ####################################### */
/* FUNCTION TO FIND THE ARTICILE AFTER CLICK ON THE ELEMENT */
/* ####################################### */

{
  const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE]  add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
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
    console.log('findAtricle:', findArticle);

    /* [DONE] add class 'active' to the correct article */

    findArticle.classList.add('active');
  };

  /* ####################################### */
  /* FUNCTION TO GENERATE ARTICLE TITLE LIST */
  /* ####################################### */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function () {
    /* [DONE] remove contents of titleList */

    document.querySelector(optTitleListSelector).innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(optArticleSelector);

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
  /* FUNCTION TO GENERATE TAG LIST */
  /* ####################################### */

  const generateTags = function () {

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
    
      /* [DONE] split tags into array */

      const tagsArray = tags.split(' ');
      // console.log('tagsArray:', tagsArray);

    
    
      /* [DONE] START LOOP: for each tag */

      for (let tag of tagsArray) {
    
        /* [DONE] generate HTML of the link */

        const linkHTML =
          '<li><a href="#' +
          tag +
          '">' +
          tag +
        '</a></li>';
        // console.log('linkHTML:', linkHTML);
    
        /* [DONE] add generated code to html variable */

        html = html + linkHTML;
    
      /* END LOOP: for each tag */

      }
    
      /* [DONE] insert HTML of all the links into the tags wrapper */

      article.querySelector(optArticleTagsSelector).innerHTML = html;
    
    /* [DONE] END LOOP: for every article: */
    }
  }

  generateTags();
}
