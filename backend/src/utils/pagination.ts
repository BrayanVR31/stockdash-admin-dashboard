export function paginateDocs(totalDocs: number, inEachPage: number|string, actualPage: number|string ) {
  let perPage = +inEachPage;
  let currentPage = +actualPage; 
  if(Number.isNaN(perPage) && Number.isNaN(currentPage)) return { pages: 0, skipDocument: 0, perPage: 0 };
  if(Number.isNaN(perPage)) perPage = 10;
  const pages = Math.ceil(totalDocs / perPage);
  const skipDocument = (perPage * currentPage) - perPage;
  return { pages, skipDocument: skipDocument > 0 ? skipDocument : 0, perPage };
}
