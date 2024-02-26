# Simple RSS reader

A few comments/clarifications:  

- This is by no means a comprehensive RSS reader. (it took me approx  1.5 hours to finish it )
- If i had to make it work with all types of feeds, I would have used a 3rd 
party library like   rss-parser  for node js
-  The purpose was to show a simple, client based approach
- I used allorigins API to prevent CORS issues
- I assume RSS feed structure like in your example url, but I also handle errors if the structure is different
- I used skeleton as loading animation
- I used tailwind as a CSS framework and vite for creating the project  
- I saw no reason to use any fancy state management solution for this task.  
- I usually use Typescript in my react projects. I used Javascript here for the sake of simplicity  
