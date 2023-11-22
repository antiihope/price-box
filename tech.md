# **WordPress Custom Block: Price Box**

## **Technical Overview**

The Price Box block is a custom WordPress block that allows users to create a dynamic pricing display. It's developed using modern JavaScript and CSS techniques, ensuring good performance and maintainability.

### **Key Technical Features**

1. **Customizable Attributes**: The block allows users to set various attributes such as plan name, price, benefits, discount, and link. It also provides options to feature a plan, add a dotted list, and align the list.

2. **Interactive Block Editor Interface**: The block provides a user-friendly interface in the block editor for setting the attributes. It allows users to toggle between different settings, enhancing the user experience.

3. **Dynamic Appearance**: The block changes its appearance based on the attributes set by the user. For example, it shows a featured tag if the plan is featured, and it shows a discount price if a discount is set.

4. **Responsive Design**: The block adjusts its layout and style based on the screen size, ensuring a good user experience on all devices.

5. **Clean and Efficient Code**: The block is developed with clean and efficient code. It uses the `@wordpress/block-editor` and `@wordpress/components` packages for creating the block and its editor interface. It also uses the `useState` hook from the `@wordpress/element` package for managing the block's state.

### **Code Structure**

The block's code is structured into several functions:

- `onTextStyleChanges`: This function updates the `textStyles` attribute when the user changes a text style setting.
- `onChangePlanName`, `onChangePrice`, `onChangeBenefits`, `onChangeDiscount`, `onChangeLink`, `onChangeFeaturedText`, `onChangeDescription`: These functions update the corresponding attributes when the user changes their values in the block editor.
- `PlanAndPriceTag`: This is a component that renders the plan name and price tag. It takes a `place` prop that determines whether the plan name is displayed above or below the price tag.

The block's editor interface is the `Edit` function. It uses the `InspectorControls` component to display the block's settings in the block editor's sidebar, and the `RichText`, `TextControl`, `SelectControl`, `ToggleControl`, and `Button` components to create the settings controls. The block's preview is rendered inside a `div` with the `price-box-container` class, and it uses the `RichText` and `Button` components to create the editable areas.
