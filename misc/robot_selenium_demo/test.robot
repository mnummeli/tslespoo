*** Settings ***
Documentation     Simple example using SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${MAIN PAGE URL}      http://localhost:3000
${BROWSER}            Chrome


*** Test Cases ***
Test Main Page
    Open Browser To Main Page

*** Keywords ***
Open Browser To Main Page
    Open Browser    ${MAIN PAGE URL}    ${BROWSER}
    Title Should Be    Robot Framework Selenium Demo
