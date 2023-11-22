# **PreReq dev price box**

November 20, 2023

### **custom block for price box**

### WordPress Custom Block: Price Box

A dynamic block type, using React for Editor and frontend visible component

The block will conclude of a parent block that hosts by default 3 price blocks/3 plans

1. Customizable:
   This block is highly customizable. It allows users to set various attributes such as plan name, price, benefits, discount, and link. It also provides options to feature a plan, add a dotted list, and align the list.

2. Interactive:
   The block is interactive. It provides a user-friendly interface in the block editor for setting the attributes. It also allows users to toggle between different settings, enhancing the user experience.

3. Dynamic:
   The block is dynamic. It changes its appearance based on the attributes set by the user. For example, it shows a featured tag if the plan is featured, and it shows a discount price if a discount is set.

4. Responsive:
   The block is responsive. It adjusts its layout and style based on the screen size, ensuring a good user experience on all devices.

5. Easy to Use:
   The block is easy to use. It provides a simple and intuitive interface in the block editor, making it easy for users to create and customize their price box.

6. Clean Code:
   The block is developed with clean and efficient code. It uses modern JavaScript and CSS techniques, ensuring good performance and maintainability.

#### inspirations

<img src="https://telegra.ph/file/2aa22ed82c3dabfa4f40f.png" style="max-width:120px" alt="Image 1">
<img src="http://tstore.thezed.me/i/600mcsv.png?s" style="max-width:120px" alt="Image 2">
<img src="https://tstore.thezed.me/i/w31sh4j.png" style="max-width:120px" alt="Image 4">
<img src="http://tstore.thezed.me/i/yznrq1u.png?s" style="max-width:120px" alt="Image 3">

## _Our block_

<img src="http://tstore.thezed.me/i/cbuo1b2.png" alt="Image 3" style="max-width: 600px;">

## themes:

### light

<img src="https://user-images.githubusercontent.com/65074998/284676426-d0a59b4a-d5ae-414b-aa36-0b527aad7862.png" alt="Image 3" style="max-width: 500px;">

### Spacy

<img src="https://user-images.githubusercontent.com/65074998/284676989-dc185823-7baa-4b29-aba0-619c33470eb5.png" alt="Image 3" style="max-width: 500px;">
### features:

- Add/Remove to the benifts list
- Choose between a dotted list or a normal list
- Control font size, color, and alignment of price tag AND plan name
- Set custom description for the plan
- Set a block to be featured, will show a featured tag and give the block a unique eye catchy style
- Select placement of Plan Name, top or bottom
- Set a previous price and a discount, will show a line through the previous price and show the discount
- Block Settings can be edited from side panel or directly from the block
- Choose from predefined theme or set your ownn to control round corners, background, and color

---

## Dev Section

### Single Block Attributes:

```
Plan name :string
Price: number
Benefits: Array[string] // array of strings, will be wrapped to show list
Discount: number | default: null // will show with line through, to show price before and after discount
LINK: string // URL to direct user to on click
Sections: array[object]
```

### Parent Block Attributes:

```
// For this an array of objects will do the job, and the length of that array defines the number of single blocks hosted
blocks:[{singleBlockAttrs},{singleBlockAttrs},...]
```
