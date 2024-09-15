'use strict';

// document.getElementById("test-button").addEventListener("click", function () {
//     const links = document.querySelectorAll(".titles a");
//     console.log("links:", links);
// });

// FIND THE ARTICILE AFTER CLICK ON THE ELEMENT

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

  // const links = document.querySelectorAll('.titles a');

  // for(let link of links){
  //     link.addEventListener('click', titleClickHandler);
  // }

  // GENERATE ARTICLE TITLE LIST

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {
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
      console.log('titleOfArticle:', linkHTML);

      /* [DONE] insert link into html variable */

      html = html + linkHTML;
    }

    document.querySelector(optTitleListSelector).innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();
}
