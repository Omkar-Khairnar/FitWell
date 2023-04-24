# *FitWell* 
## Note : Installation of Packages & Initiallize database only required When Repository is Clone from Github. Else Unzipped it and directly run the Application as it already contain required packages and '.env' file .

## Requirements
```
1. MongoDB Compass 
2. Node.JS environment 
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



## Initiallize database
> - Unzip the Provided DUMP folder.
> - Make Sure that ```MongoDB Command Line Database Tools``` and ```MongoDB Compass``` is Installed and set up in your system.

1. Open the commind line terminal and set the current directory as Parent directory of DUMP folder.
(let Desktop is Parent directory of DUMP folder then , select Desktop as current directory in Terminal)

2. Run the following command in the terminal
>- ``` mongorestore dumpFitwell/ ```

#
>- ### Installation and Initiallization is COMPLETED.
#



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

## Sample Admin/User Login
> - Email : admin123@gmail.com
> - Password : Admin@123 
 

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
