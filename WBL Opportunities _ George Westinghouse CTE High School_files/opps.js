// table js
let table = new DataTable('#wblTable');
let wholeTable = document.querySelector('#wblTable');

// to top chevron code
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (scrollY > 120) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    wholeTable.classList.add("table-striped");
  } else {
    wholeTable.classList.remove("table-striped");
  }
});

// console.log(wholeTable)

fetch(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIQG_WEarnMucN2q9baSoZD0TFtiWlRP_uP4e8hOEgxgacad5inctWkjL6XaRx-fOuxjSR0HLmELMj/pubhtml?gid=0&single=true')
  .then((response) => response.text())
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('.waffle');

    // Extract data from the table (example: get all text content)
    let tableData = [];
    table.querySelectorAll('tr').forEach((row) => {
      let rowData = [];
      row.querySelectorAll('td').forEach((cell) => {
        rowData.push(cell.textContent.trim());
      });

      tableData.push(rowData);

    });

    // removes unknown empty array element at index 0
    tableData.splice(0, 1);

    new DataTable('#wbl-opps-table', {
      columns: [
        { title: 'Organization' },
        { title: 'Eligibility' },
        { title: 'Location' },
        { title: 'Deadline' },
        { title: 'Description' },
        { title: 'Paid' },
        { title: 'Media' },
        { title: 'Link' }
      ],
      data: tableData,
    });


    const tableHead = document.getElementById("wbl-opps-table");
    tableHead.classList.add("table-text-color");

    // You can now use the tableData with your chosen library (Tabulator, ag-Grid, etc.)
    // ...
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

