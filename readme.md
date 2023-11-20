# **PreReq dev price box**

November 20, 2023

### **custom block for price box**

A dynamic block type, using React for Editor and frontend visible component

![](https://telegra.ph/file/2aa22ed82c3dabfa4f40f.png)

### Block Attributes:

```
Plan name :string
Price: number
Benefits: Arary[string] // array of strings, will be wrapped to show list
Discount: number | default: null // will show with line through, to show
LINK: string // url to direct user to on click
Sections: array[object]
// sections example:
// [
//   "top":{
//     'background-color': '#fff',
//     percentage: 50, // what percentage the section should take from the height of the block
//   },
//   "bottom":{
//     'background-color': '#fff',
//     percentage: 50,
//   },
// ];
```

#### \- Block Attributes can be edited from side panel or directly from the block

**\-Initial packages:**

**@wordpress/data @wordpress/components @wordpress/element @wordpress/block-editor @wordpress/scripts**

**styling using scss**

## Technical prereq:

- **Enqueue Block Editor Scripts: enqueue JavaScript and CSS for the block editor. Use the wp_enqueue_script and wp_enqueue_style functions.**
- **Register a New Block Type: register a new block type using the registerBlockType function. This function takes the name of the block and an object with configuration options.**
- **Define Block Attributes: Define the attributes. For the price box, we'll need attributes for plan name, price, benefits, discount, link, and sections.**
- **Create Edit Function: This function will render the block in the editor. It should return a React component. Use WordPress components like TextControl, NumberControl, URLInput, and ColorPicker to create the UI for the block's attributes.**
- **Create Save Function: This function will render the block on the front end. It should return a JSX markup.**
