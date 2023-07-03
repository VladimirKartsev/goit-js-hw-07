import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector(".gallery");
const markup = createGalleryItems(galleryItems);

galleryList.insertAdjacentHTML("beforeend", markup);
function createGalleryItems(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}
const onClick = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  const source = e.target.dataset.source;
  const alt = e.target.alt;
  const instance = basicLightbox.create(
    `<img src="${source}" alt="${alt}" width='800' height='600'/>`
  );
  instance.show();

  const instanceClose = () => {
    instance.close();
    document.removeEventListener("keydown", keyDown);
  };

  const keyDown = (evt) => {
    if (evt.key === "Escape") {
      instanceClose();
    }
  };
  document.addEventListener("keydown", keyDown);
};
galleryList.addEventListener("click", onClick);
