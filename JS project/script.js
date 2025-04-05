function Author(n,e){
    this.name = n || "empty";
    this.email = e || "empty";
  }

function book(n,p,a){
  this.name = n || "";
  this.price = p || 0.0;
  this.author = a;
}

var okbuuton = document.querySelector(".nofbooks button");
var form = document.querySelector("#form");
var NofBooksBlock = document.querySelector(".nofbooks");
var check = 0;
okbuuton.addEventListener("click",function(){
  booksNum = document.getElementById("booksNum").value;
  check = booksNum.trim();
  if(((/^[+-]?\d+(\.\d+)?$/).test(check))){
      check = parseInt(check);
      form.style.display = "block";
      NofBooksBlock.style.display = "none";
  }
})


var addBook = document.querySelector("#form button");
var booknameError = document.querySelectorAll("#form .error")[0];
var priceError = document.querySelectorAll("#form .error")[1];
var authorNameError = document.querySelectorAll("#form .error")[2];
var emailError = document.querySelectorAll("#form .error")[3];
var table = document.querySelector("table");
var tbody = document.querySelector("tbody");
var arr = new Array;
var bookcounter = 1;


addBook.addEventListener("click",function(){
  var bookname = document.querySelectorAll("#form input")[0];
  var price = document.querySelectorAll("#form input")[1];
  var authorName = document.querySelectorAll("#form input")[2];
  var email = document.querySelectorAll("#form input")[3];
  !(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s\-',.!?]+$/).test(bookname.value) ? booknameError.style.display = "block" : booknameError.style.display = "none";
  !(/^(?:\$)?(?!0\d)\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/).test(price.value) ? priceError.style.display = "block" : priceError.style.display = "none";
  !(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s\-',.!?]+$/).test(authorName.value) ? authorNameError.style.display = "block" : authorNameError.style.display = "none";
  !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value) ? emailError.style.display = "block" : emailError.style.display = "none";
  
  if(emailError.style.display == "none" && authorNameError.style.display == "none" && priceError.style.display == "none" && booknameError.style.display == "none"){
    var authordata = new Author(authorName.value,email.value);
      var bookdata = new book(bookname.value,price.value,authordata);
      arr.push(bookdata);
      
      bookcounter++;
  }
  displayBooksTable();
  if(bookcounter > booksNum){
    form.style.display = "none";
    table.style.display = "table";
    console.log("done");
  }
})

function displayBooksTable() {
  
  tbody.innerHTML = '';
  
  arr.forEach((book, index) => {
      var row = document.createElement('tr');
      row.dataset.index = index;
      row.innerHTML = `
          <td>${book.name}</td>
          <td>$${book.price}</td>
          <td>${book.author.name}</td>
          <td>${book.author.email}</td>
          <td class="action-buttons" style="display:flex;justify-content: space-around;">
              <button class="edit-btn" onclick="editBook(${index})">Edit</button>
              <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
          </td>
      `;
      tbody.appendChild(row);
  });
}


        function editBook(index) {
          var book = arr[index];
          var row = document.querySelector(`tr[data-index="${index}"]`);
          
          row.innerHTML = `
              <td><input type="text" value="${book.name}" id="editName${index}">
              <p class="editName${index}" style="margin: 0px;font-size: 10px;color: black;text-align: left;display:none;">Enter Valid Data</p>
              </td>
              <td><input type="number" value="${book.price}" id="editPrice${index}">
              <p class="editPrice${index}" style="margin: 0px;font-size: 10px;color: black;text-align: left;display:none;">Enter Valid Data</p>
              </td>
              <td><input type="text" value="${book.author.name}" id="editAuthorName${index}">
              <p class="editAuthorName${index}" style="margin: 0px;font-size: 10px;color: black;text-align: left;display:none;">Enter Valid Data</p>
              </td>
              <td><input type="email" value="${book.author.email}" id="editAuthorEmail${index}">
              <p class="editAuthorEmail${index}" style="margin: 0px;font-size: 10px;color: black;text-align: left;display:none;">Enter Valid Data</p>
              </td>
              <td class="action-buttons" style="display:flex;justify-content: space-around;">
                  <button class="save-btn" onclick="saveBook(${index})">Save</button>
                  <button class="cancel-btn" onclick="displayBooksTable()">Cancel</button>
              </td>
          `;
      }


        function saveBook(index) {
          var name = document.getElementById(`editName${index}`).value;
          var price = parseFloat(document.getElementById(`editPrice${index}`).value);
          var authorName = document.getElementById(`editAuthorName${index}`).value;
          var authorEmail = document.getElementById(`editAuthorEmail${index}`).value;
          var booknameError = document.querySelector(`p.editName${index}`);
          var priceError = document.querySelector(`p.editPrice${index}`);
          var authorNameError = document.querySelector(`p.editAuthorName${index}`);
          var emailError = document.querySelector(`p.editAuthorEmail${index}`);
          !(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s\-',.!?]+$/).test(name) ? booknameError.style.display = "block" : booknameError.style.display = "none";
          !(/^(?:\$)?(?!0\d)\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/).test(price) ? priceError.style.display = "block" : priceError.style.display = "none";
          !(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s\-',.!?]+$/).test(authorName) ? authorNameError.style.display = "block" : authorNameError.style.display = "none";
          !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(authorEmail) ? emailError.style.display = "block" : emailError.style.display = "none";
          if(emailError.style.display == "none" && authorNameError.style.display == "none" && priceError.style.display == "none" && booknameError.style.display == "none"){
          arr[index].name = name;
          arr[index].price = price;
          arr[index].author.name = authorName;
          arr[index].author.email = authorEmail;

          displayBooksTable();
        }
      }


        function deleteBook(index) {
          if (confirm('Are you sure you want to delete this book?')) {
              arr.splice(index, 1);
              displayBooksTable();
          }
      }



