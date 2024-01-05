const file = 'img_20240103_230646_296.jpg'
const mime = file.split('_');
const fileChangeName = mime[0].replace(/[^\w\s]/gi, ' ').replace(/\s+/g, '-').toLowerCase();
const files = `${fileChangeName}.${mime[1]}`
console.log(files)