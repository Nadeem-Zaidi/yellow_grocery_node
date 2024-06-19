let mainCategorySql = `select name,images from (SELECT node.name,node.images, (COUNT(parent.name) - (sub_tree.depth + 1)) AS depth
FROM "Category" AS node,
        "Category" AS parent,
        "Category" AS sub_parent,
        (
                SELECT node.name, (COUNT(parent.name) - 1) AS depth
                FROM "Category" AS node,
                        "Category" AS parent
                WHERE node.left BETWEEN parent.left AND parent.right
                        AND node.name = 'Yellow_Grocery'
                GROUP BY node.name,node.left,node.images
                ORDER BY node.left
        ) AS sub_tree
WHERE node.left BETWEEN parent.left AND parent.right
        AND node.left BETWEEN sub_parent.left AND sub_parent.right
        AND sub_parent.name = sub_tree.name
GROUP BY node.name, sub_tree.depth,node.images
HAVING depth <= 1
ORDER BY node.name LIMIT 100) where depth=1`

export default mainCategorySql