const postId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return id;
};

const loadArticle = async (id) => {
  const url = new URL(`https://gorest.co.in/public-api/posts`);
  url.searchParams.append('id', id);
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

const getUser = async (id) => {
  const url = new URL(`https://gorest.co.in/public-api/users/${id}`);
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export const createArticle = (data) => {
  const bodyArticle = document.querySelector('.body-article');
  bodyArticle.innerHTML = '';
  const dataArticle = data.map(async (post) => {
    const user = await getUser(post.user_id);
    const article = document.createElement('article');
    article.classList.add('article');
    article.insertAdjacentHTML(
      'beforeend',
      `
      <h1 class="article__title">${post.title}</h1>
      <div class="article__wrapper-text">
        <p class="article__text">${post.body}</p>
      </div>
      <a class="article__link article__link_back" href="http://blog.html">К списку статей</a>
      <p class="article__author">${post.user_id}</p>
      `,
    );

    bodyArticle.append(article);
  });
};

loadArticle(postId()).then(createArticle);
