# How to

  1. Change the database config in ./config/db.config.js
  2. Run 'npm run init-table', this creates the necessary table for the DB and adds sample data inside of each table.
      * THIS WILL DELETE THE TABLE 'Customer' AND 'Transaction', ALONG WITH THE DATA INSIDE! *
  3. You can start the server by either using the command 'npm run start' or 'node app.js'
  4. Poke at the server!

  Routes:
    /transaction (GET)
    Gets all transaction. Comes with several (optional) queries:
      - menu : menu name
      - minprice : minimum price for product/transaction
      - maxPrice : maximum price for product/transaction
      - orderByCustomerName : only accepts ASC or DESC
    example url:
      BASEURL/transaction/?menu=Ayam Laut&minPrice=0&maxPrice=30000

    /transaction/new (POST)
    Creates a new transaction. Body requirements (all required):
      - customer_id : customer id
      - menu : menu name
      - price : menu price
      - qty : menu quantity
      - payment : amount paid
    example url:
      BASEURL/transaction/new
      /w  body:
        {
          customer_id:2
          menu:Ayam Darat
          price:50000
          qty:2
          payment:100000
        }

Tech stack:

* Node JS
* Express
* PostgreSQL
* Redis
* Sequelize (not as ORM, just as means to connect to DB)

Untuk hal yang diperhatikan:
Untuk menghemat operasi ke database, saya memutuskan untuk menggunakan sistem caching via Redis. Dengan begitu, beban operasional untuk membaca data akan berkurang drastis, dikarenakan data yang sama akan diambil dari cache daripada database.
Selain itu, saya berencana untuk mengaplikasikan sistem Transaction (BEGIN, COMMIT, ABORT, END / COMMIT,ROLLBACK) untuk menghindari operasi overlap dari banyaknya koneksi, dan menghindari error saat validasi untuk menambah data ke table gagal.

Untuk mengapa saya memutuskan untuk memilih tech stack di atas, alasan utama adalah familiaritas dan time limit. Saya sedang proses mempelajari Golang, sedangkan untuk Javascript/NodeJS saya cukup review ulang saja. Dan dengan konsiderasi waktu yang terbatas, saya memutuskan untuk memilih menggunakan NodeJS. Begitu juga dengan PostgreSQL. Redis digunakan untuk caching data untuk menghemat biaya operasional READ ke database.
