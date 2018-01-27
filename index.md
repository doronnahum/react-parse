## How can this help you

If you are working with [parse-server](https://github.com/parse-community/parse-server) and you working with react/react-native and redux+sage then you going to love this!

## Why i need this

because this going to help you get docoment from server in one line, most of the time we need the same thing on hower container:
- get data on load,
- show loader antil we get all the data
- change values and PUT to server

## Exapmle
<FetchDocumen collectionName='Post' objectId={'blDxFXA9Wk'} render={(res) => <MyComponent {...res}/>} />

FetchDocumen will query to Psot collection and get for you document with objectID 'blDxFXA9Wk'
the rende props will render your function and pass you all what you need: query staus, data...

## Installation
1.Init reat-parse api on your root file.
	-import { api } from "react-parse"
	-	api.init({ appId: 'MY_PARSE_SERVER_APP_ID', baseURL: 'MY_PARSE_SERVER_URL'});



You can use the [editor on GitHub](https://github.com/doronnahum/react-parse/edit/master/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/doronnahum/react-parse/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
