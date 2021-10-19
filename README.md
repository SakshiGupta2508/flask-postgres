<div id="top"></div>

  <h3 align="center">RESTful Application</h3>

  <p align="center">
    RESTful Interface to perform CRUD operations on data.
  </p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li></ul>
    </li>
    <li><a href="#run-application">Run Application</a></li>
    <li><a href="#Screenshot-Of-User-Interface">Screenshot Of User Interface</a></li>
    <li><a href="#project-description">Description</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The main job is to develop a RESTful User Interface to interact with Store Data which is saved in the database.

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With


* [Python](https://www.python.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)
* [AG-Grid](https://www.ag-grid.com/)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.


### Installation

* Git clone project
* Install requirements (pip install -r requirements.txt)


## Run Application

```sh
   python app.py
   ```
   
## Screenshot Of User Interface

![image](https://user-images.githubusercontent.com/91659496/137856331-85ae7537-8632-4536-952c-734716058a0e.png)


<!-- Project Description -->
## Project Description

1. PostgreSQL database has been setup for this project. 
2. A backend Python code has been written that performs CRUD operations on the data from Database.
3. A RESTful User Interface has been built using Flask Framework. HTML, CSS, jQuery, Bootstrap and AG-grid have been used to build the frontend.  
4. UI features: <br>
    i) Displays a grid with the following columns: **city**, **start date**, **end date**, **price**, **status**, **color**.The data is requested from the backend. <br>
    ii) All columns are sortable, filterable, resizable, editable. Users can change the order of the columns as well. <br>
    iii) To **update** or **delete** a row, **action** column has been provided. User can click on edit button to update the data and cancel in case of no updation. <br>
5. Columns and Filters Panel have been provided for the user to interact with the GRID data.
6. **ADD** button has been provided to add rows. It opens a modal popup with the input fields.
7. Above the grid, two date pickers have been provided to filter the object by date range. 
8. **Refresh** button has been provided which will refresh the data from the backend.



<!-- CONTACT -->
## Contact

Name - [Sakshi](https://www.linkedin.com/in/sakshi-gupta-0aa978140/)

Project Link: [RESTful Interface](https://github.com/SakshiGupta2508/flask-postgres)

<p align="right">(<a href="#top">back to top</a>)</p>


