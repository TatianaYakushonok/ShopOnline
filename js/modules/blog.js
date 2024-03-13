let pageNumber = 1;
const numberOfPages = 30;

const getPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  console.log(window.location.search);
  return page ? page : 1;
};

console.log(getPage());

const loadPosts = async () => {
  const url = new URL(`https://gorest.co.in/public-api/posts`);
  url.searchParams.append('page', pageNumber);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function setPage(page) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('page', page);
  const newRelativePathQuery =
    page === 1
      ? window.location.pathname
      : window.location.pathname + '?' + searchParams.toString();
  history.pushState(null, '', newRelativePathQuery);
}

const prevDataPost = (e) => {
  e.preventDefault();
  if (pageNumber > 1) {
    pageNumber--;
    setPage(pageNumber);
    renderPosts();
  }
};

const nextDataPost = (e) => {
  e.preventDefault();
  if (pageNumber < numberOfPages) {
    pageNumber++;
    setPage(pageNumber);
    renderPosts();
  }
};

const handlerPage = (e) => {
  const paginationPage = document.querySelectorAll('.pagination__page');
  e.preventDefault();
  const target = e.target;
  paginationPage.forEach((page) => {
    page.classList.remove('active');
  });
  if (target.classList.contains('pagination__page')) {
    target.classList.add('active');
    //const pageNum = parseInt(target.textContent);
    //setPage(pageNumber);
    //console.log(setPage(pageNumber));
    renderPosts();
  }
};

const renderPaginationPage = () => {
  let paginationItems = '';

  let startPage =
    pageNumber === numberOfPages && numberOfPages >= 3
      ? pageNumber - 2
      : Math.max(1, pageNumber - 1);
  let endPage = Math.min(startPage + 2, numberOfPages);
  let pathname = window.location.href;

  for (let i = startPage; i <= endPage; i++) {
    const classActive =
      pageNumber === i ? 'pagination__page active' : 'pagination__page';
    paginationItems += `<li class="${classActive}">
        <a
          href="${pathname}?page=${i}"
          class="pagination__link"
        >
          ${i}
        </a>
      </li>
      `;
  }

  return paginationItems;
};

const createPagination = () => {
  const paginationPage = renderPaginationPage();
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.insertAdjacentHTML(
    'beforeend',
    `
    <button class="pagination__btn pagination__btn-prev" type="button">
      <svg class="pagination__icon-btn pagination__icon-btn-prev" width=" 29"
        height="19" viewBox="0 0 29 19" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M28.375 7.95833H6.52958L12.0487 2.42375L9.875 0.25L0.625 9.5L9.875 18.75L12.0487 16.5763L6.52958 11.0417H28.375V7.95833Z"
          fill="currentColor" />
      </svg>
    </button>
    <div class="pagination__pages">
      ${paginationPage}
    </div>
    <button class="pagination__btn pagination__btn-next">
      <svg class="pagination__icon-btn pagination__icon-btn-next" width="29"
        height="19" viewBox="0 0 29 19" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.625 7.95833H22.4704L16.9513 2.42375L19.125 0.25L28.375 9.5L19.125 18.75L16.9513 16.5763L22.4704 11.0417H0.625V7.95833Z"
          fill="currentColor" />
      </svg>
    </button>
    `,
  );

  return pagination;
};

export const renderPosts = async () => {
  const data = await loadPosts();
  console.log(data);
  const pagin = createPagination();

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('posts');

  const posts = data.data.map((item, ind) => {
    const post = document.createElement('div');
    post.classList.add('post');
    post.setAttribute('data-id', item.id);
    post.insertAdjacentHTML(
      'beforeend',
      ` 
        <img class="post__img" src='https://loremflickr.com/400/400?${ind}' alt=${item.title}>
        <a class="post__link" href="/article.html?id=${item.id}">
          <h2 class="post__title">${item.title}</h2>
        </a>
      `,
    );
    return post;
  });

  const main = document.querySelector('.blog__main');
  main.innerHTML = '';
  cardsWrapper.append(...posts);
  main.prepend(cardsWrapper, pagin);

  const btnNext = document.querySelector('.pagination__btn-next');
  const btnPrev = document.querySelector('.pagination__btn-prev');
  const paginationPage = document.querySelectorAll('.pagination__page');

  btnNext.addEventListener('click', nextDataPost);
  btnPrev.addEventListener('click', prevDataPost);
  paginationPage.forEach((page) => {
    page.addEventListener('click', handlerPage);
  });
};

renderPosts();
setPage(pageNumber);
