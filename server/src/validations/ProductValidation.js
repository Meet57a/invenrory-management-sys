class ProductValidation {
    static productValidation(req, res, next) {
        const { Title, Price, Quantity, Stock, Category, SubCategory, image, Visible, Description, LimitLowStock } = req.body;

        console.log(req.body);

        if (req.body != null) {
            if (!Title) {
                return res.status(400).json({ message: "Title is required" });
            }
            if (!Price) {
                return res.status(400).json({ message: "Price is required" });
            }
            if (!Quantity) {
                return res.status(400).json({ message: "Quantity is required" });
            }
            if (!Stock) {
                return res.status(400).json({ message: "Stock is required" });
            }
            if (!Category) {
                return res.status(400).json({ message: "Category is required" });
            }
            if (!SubCategory) {
                return res.status(400).json({ message: "Subcategory is required" });
            }
            // if (!image) {
            //     return res.status(400).json({ message: "Image is required" });
            // }
            if (!Visible) {
                return res.status(400).json({ message: "Visibility is required" });
            }
            if (!Description) {
                return res.status(400).json({ message: "Description is required" });
            }
            if (!LimitLowStock) {
                return res.status(400).json({ message: "Low Stock Limit is required" });
            }
            if (
                Title &&
                Price &&
                Quantity &&
                Stock &&
                Category &&
                SubCategory &&
               
                Visible &&
                Description &&
                LimitLowStock
            ) {
                next();
            }
        }

    }

    static categoryValidation(req, res, next) {

        const { Category } = req.body;
        console.log(req.body);
        if (req.body != null) {
            if (!Category) {
                return res.status(400).json({ message: "Category is required" });
            }

            next();

        }

    }

    static subCategoryValidation(req, res, next) {
        const { Category, SubCategory } = req.body;
        console.log(req.body);
        if (req.body != null) {
            if (!Category) {
                return res.status(400).json({ message: "Category is required" });
            }
            if (!SubCategory) {
                return res.status(400).json({ message: "SubCategory is required" });
            }
            if (Category && SubCategory) {
                next();
            }
        }
    }
}

module.exports = ProductValidation;