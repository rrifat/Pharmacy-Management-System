/* DATABASE QUERY FOR PROJECT 'Pharmacy Management System using Node.Js' */


/*Table : User_Access*/

CREATE TABLE User_Access
(
Username VARCHAR(25) PRIMARY KEY NOT NULL,
Password VARCHAR(32) NOT NULL,
Usertype VARCHAR(10) NOT NULL
);



/*Table : Users Information*/

CREATE TABLE User_Information
(
ID INT AUTO_INCREMENT NOT NULL,
Name VARCHAR(50) NOT NULL,
Email VARCHAR(50) NOT NULL,
Gender VARCHAR(10) NOT NULL,
Date_of_Birth DATE NOT NULL,
Age INT NOT NULL,
Address VARCHAR(100) NOT NULL,
Contact INT NOT NULL,
Blood_Group VARCHAR(15) NOT NULL,
Marital_Status VARCHAR(10) NOT NULL,
Join_Date DATE NOT NULL,
Salary INT NOT NULL,
Username VARCHAR(25) NOT NULL,
PRIMARY KEY(ID),
FOREIGN KEY (Username) REFERENCES user_access(Username)
);


/*Table : Manufacturer*/

CREATE TABLE Manufacturer
(
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
Manufacturer_Name VARCHAR(50) NOT NULL
);

/*Table : Category*/

CREATE TABLE Category
(
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
Category VARCHAR(50) NOT NULL
);

/*Table : Drug Generic Name*/


CREATE TABLE Drug_Generic_name
(
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
Generic_Name VARCHAR(255) NOT NULL,
Description VARCHAR(255) NOT NULL
);

/*Table : Medicine Information*/

CREATE TABLE Medicine_Information
(
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
Medicine_Name VARCHAR(50) NOT NULL,
Category VARCHAR(20) NOT NULL,
Generic_ID INT NOT NULL,
Manufacturer_ID INT NOT NULL,
Category_ID INT NOT NULL,
FOREIGN KEY (Generic_ID) REFERENCES drug_generic_name(ID),
FOREIGN KEY (Manufacturer_ID) REFERENCES manufacturer(ID),
FOREIGN KEY (Category_ID) REFERENCES category(ID)
);


/*Table : Supplier*/

CREATE TABLE Supplier
(
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
Supplier_Name VARCHAR(50) NOT NULL,
Contact VARCHAR(20) NOT NULL,
Email VARCHAR(50) NOT NULL
);


/*Table : Batch*/

CREATE TABLE Batch
(
Batch_ID INT PRIMARY KEY NOT NULL,
Quantity INT NOT NULL,
Cost_Price FLOAT NOT NULL,
Sell_Price FLOAT NOT NULL,
Production_Date DATE NOT NULL ,
Expire_Date DATE NOT NULL,
Purchase_ID INT NOT NULL,
Medicine_ID INT NOT NULL,
Supplier_ID INT NOT NULL,
FOREIGN KEY (Supplier_ID) REFERENCES supplier(ID),
FOREIGN KEY (Medicine_ID) REFERENCES medicine_information(ID)
);

/*Table : Bill Information*/

CREATE TABLE Bill_Information
(
Invoice_No INT PRIMARY KEY NOT NULL,
Total_Amount FLOAT NOT NULL,
Discount VARCHAR(10) NOT NULL,
Discount_Amount FLOAT NOT NULL,
Total_Payable FLOAT NOT NULL,
Paid FLOAT NOT NULL,
Returned FLOAT NOT NULL,
Date DATE NOT NULL
);
