# SwapStreet File Descriptions 

## Main Folders
>Auth
>components
>resources
>user


### Auth folder


|   File         |Contents                       |
|----------------|-------------------------------|
|index.js        |register()                     |
|                |login()                        |
|                |logout()                       |
|                |authenticate()                 |
|                |isAuthenticated()              |


##### PrivateRoute.js: 
#
				//Provides routes based on user authentication
				isAuthenticated() ? user_authenticated : Redirect "/login"
				

#### components folder: 

>dashboard folder

|   File           |Description                               			 	|
|------------------|--------------------------------------------------------|
|activeListings.js | returns users active job listings					 	|
|currentJobs.js    |returns users current jobs							    |
|dashboard.js 	   | returns users jobs, users active jobs & users past jobs|
|history.js 	   | returns users past currentJobs							|
|info.js 		   | returns user name, balance, rating  				    |
#

### components ▶ Sub-folders

>datafill: contains files to create and update jobs forms
#
>homePage: contains files to display jobs + job filter 
#
>jobPage: contains files for setting job details 
#
>myJobPage:  contains files for applying for job

userProfile: 	    changeInfo.js
					userProfile.js
|   Sub-folder   |   Contents    |
|----------------|---------------|
| userProfile ▶ |changeInfo.js  |
|                |userProfile.js |

>dataRouter.js: Routes data based on isAuthenticated()

####  resources folder:
		 Contains misc files 
####  user folder: 	
>Login.js 
>Register.js
			
|   Sub-folder   |   Contents    |
|----------------|---------------|
| userProfile    |changeInfo.js  |
|                |userProfile.js |

### Notes:

|Job Status     |Description    |
|---------------|-----------    |
|    1          | Listed Job    |
|    2          | Applied       |
|    3          | Active        |
|    4          | Completed     |

