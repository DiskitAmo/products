import * as React from "react"
import { graphql } from "gatsby"
import { useEffect, useState } from "react"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Box, CardActionArea } from "@mui/material"

const IndexPage = ({ data }) => {
  const [productlist, setProductlist] = useState([])

  const products = data.allContentfulProduct.edges

  useEffect(() => {
    setProductlist(products)
  }, [])

  return (
    <div>
      <Typography variant="h1" sx={{ textAlign: "center", padding: "20px" }}>
        Products list
      </Typography>
      <Box
        component="div"
        className="container"
        sx={{
          display: "grid !important",
          gridTemplateColumns: "repeat(3, 1fr) !important",
          rowGap: "30px !important",
          columnGap: "50px !important",
        }}
      >
        {productlist.map((item, index) => {
          return (
            <div className="product" key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.node.image.publicUrl}
                    alt="products"
                    sx={{ objectFit: "contain !important" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.node.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      ${item.node.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          )
        })}
      </Box>
    </div>
  )
}

export default IndexPage

export const productquery = graphql`
  query {
    allContentfulProduct {
      edges {
        node {
          price
          name
          image {
            publicUrl
          }
        }
      }
    }
  }
`
