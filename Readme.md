# <div align="center"> Extract - Major Project </div>


# Table of Contents
1. [ Problem Statement ](#problemstatement)
2. [ Solution ](#solution)
3. [ Directory Flow ](#structure)
4. [ Working ](#working)
5. [Deep Learning Modes Used](#deeplearning)
6. [ Tech Stack Used ](#tech_stack)
7. [ Future Initiatives ](#future_initiatives)
8. [ External Lins ](#links)


<a name="problemstatement"></a>
# Problem Statement
There are many sites available over the internet to find answers for your problems/bugs like <button>Chegg</button>, <button>StackOverflow</button>, but none of the sites offer peer to peer answering in form of images or digital media. The biggest perk of this sharing is no requirement of typing and answering question. It is most helpful in the cases of academic questions. As most of the questions students of any corner of the world knows in the form of his/her notes, but don't bother to type and answer the question. 

<a name="solution"></a>
# Solution
Extract is solution for this problem, which offers three important solutions to world at one place:-

1. Storage to store the notes in the form of images which solves the problems of hard copy notes.
2. Extracting necessary data and questions from those images to provide answers globally available.
3. Questioning as in StackOverflow where users community can manually link questions asked to the answers/images.


<a name="structure"></a>
# Directory Flow
```
Extract
|--- Backend
|    |--- middleware 
|    |     |--- Contains middlewares for backend
|    |--- models
|    |     |--- Contains all schemas
|    |--- routes
|    |     |--- All routes
|    |--- index.js
|    |--- db.js

|--- extract
|    |--- public
|    |    |--- Public files
|    |--- pages
|    |    |--- All pages of website
|    |--- components
|    |    |--- All components of website (ReactJs part)
```

<a name="working"></a>
# Working
* Working of `Extract` involves Login/Signup as a user.
* Now you are eligible to create as many folders as required and add your notes to the folder.
* Also you will be given an option to choose whether to make the folder public/private.
* Public folder means the data will be extracted from the images uploaded in that folder to make them available gloabally.
* Now the public folder images data is extracted filtered using AI/ML models and then question is extracted out of the image. 
* The question with its image answer is now available globally to the users.
* One another feature of `Extract` is asking questions, if question is not answered yet or can't match the relevant text, then users community can link the question to the image.

<a name="deeplearning"></a>
# Deep Learning Modes Used
* Firstly the model used for OCR of image is docTR. It is pretrained and developed by Open-source community. It required all the requirements mentioned in `requirements.txt`.
* Install all requirements then you are ready to go.
> Why docTR is used?
* I used docTR model because of very high accuracy as compared to any other OCR and it can very easily judges number and symbols which are essential in high studies.

<br>

<a name="tech_stack"></a>
# Tech Stack Used
--> Node JS Libraries
```
npm install bcryptjs
```
```
npm install body-parser
```
```
npm install cors
```
```
npm install dotenv
```
```
npm install express
```
```
npm install express-validator
```
```
npm install jsonwebtoken
```
```
npm install mongoose
```

--> Next.JS/React.JS Libraries
```
npm install react-dom
```
```
npm install mdb-ui-kit
```
```
npm install -d autoprefixer
```
```
npm install -d postcss
```
```
npm install -d tailwindcss
```

<a name="future_initiatives"></a>
# Future Initiatives

<a name="links"></a>
# External Links

// {
//     "rewrites": [
//       { "source": "/(.*)", "destination": "main" }
//     ]
//   }