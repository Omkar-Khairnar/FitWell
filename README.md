# *FitWell* 


## Requirements
```
1. MongoDB Compass 
2 .Node.JS environment 
3. MongoDB Command Line Database Tools
Sholud be Installed in your system.
```


## Installation And Import Packages
1. Unzip(Extract) above "FitWell" Zipped Code base in a seperate folder.

2. Open the above extracted folder's (FitWell) path in the Windows Terminal.
(Select unzipped "FitWell" folder , then Right click , select 'Open in Terminal' option).

3. Run the Follwing commands in terminal Simultaneously 
(Only once after Cloning repository, If already done then not required) : 
> - ``` npm i dotenv --save ```
> - ``` npm i multer --save ```

4. Open the Fitwell directory in file folder and create a new file named as 
".env" in main directory (Fitwell).
Paste the following lines in the file ".env".
> - Make sure that , Port number of you MongoDB instance is : 27017
```
JWT_SECRET=FFSD_FITWELL_PROJECT
mongoURI=mongodb://127.0.0.1:27017/Fitwell
```
5. Run the Command in the Terminal (current directory should be : FitWell).
> - ``` npm run serve ```
6. Wait for the below Message in terminal.
```
Fitwell app listening at http://localhost:5000
MongoDB Database connected!
```
7. Press " ctrl+c " to terminate current Job. 




## Initiallize database
- **We have total 11 collections and initiallize them in MongoDb Compass using JSON files provided in "Dump" folder**
- Collections : admins, carts, challenges, contactforms, orders, payments, products, reviews, trainers, users, workouts.
```
1. Select "Fitwell" database. You'll see 11 collections.
2. select collection "admins" -> 'ADD DATA' -> 'IMPORT JSON FILE' .
3. select the file 'admins.json' from provided "DUMP"folder.
4. Click : 'IMPORT' -> 'DONE'.
5. 'admins' collection is Initiallized.

6. Repeat setps 2 to 4 to Initiallize other 10 collections. 
Make sure to select respective JSON file for each collection.

Note : You can also Use online MongoDB Atlas, but make sure that value of mongoURI in ".env"  file should be according to that. 
```
>- ### Installation and Initiallization is COMPLETED.




## Run Application

1. Set the current directory as "Fitwell" Windows Termina/Powershell.
2. Run the Command in the Terminal : 
> - ``` npm run serve ```
3. Wait for the below Message in terminal.
```
Fitwell app listening at http://localhost:5000
MongoDB Database connected!
```
4. Open Google Chrome Browser and search for : [http://localhost:5000](http://localhost:5000)

5. Now you are redirected to our website.




## Contributors
```
IIIT SriCity : UG2 - FFSD 1 Project (Batch 21-25)

Section 1 - Group 12

Bucket -1 
Omkar Kailash Khairnar (S20210010120)
Kartik Niranjan Patel  (S20210010171)

Bucket -2
Shivang Shingh (S20210010207)
Chirag Dhiwar  (S20210010064)

Bucket -3
Karthik Onteru (S20210010163)

```

>## GitHub Repository 
>- [FitWell](https://github.com/Omkar-Khairnar/FitWell.git)
>- https://github.com/Omkar-Khairnar/FitWell.git 