import requests
import json
from typing import Dict
from dataclasses import dataclass

@dataclass
class ShopifyConfig:
    store_url: str
    access_token: str
    api_version: str = "2025-07"

class ShopifyHeadless:
    def __init__(self, config: ShopifyConfig):
        self.config = config
        self.base_url = f"https://{config.store_url}/api/{config.api_version}/graphql.json"
        self.headers = {
            "X-Shopify-Access-Token": config.access_token,
            "Content-Type": "application/json"
        }

    def execute_query(self, query: str, variables: Dict = None) -> Dict:
        payload = {
            "query": query,
            "variables": variables or {}
        }
        
        response = requests.post(
            self.base_url,
            headers=self.headers,
            json=payload
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Query failed: {response.text}")

def main():
    # Configure your Shopify store details here
    config = ShopifyConfig(
        store_url="zhg0av-v1.myshopify.com",
        access_token="1120683cb1f9cc03edb0ee194f1b9ddc"
    )
    
    client = ShopifyHeadless(config)
    
    # Test query to get first 5 products
    test_query = """
    {
        products(first: 5) {
            edges {
                node {
                    id
                    title
                    handle
                    images(first: 1) {
                        edges {
                            node {
                                src
                            }
                        }
                    } 
                    category {
                        id                        
                        name
                    }
                    variants(first: 5) {
                        edges {
                            node {
                                id
                                title
                                sku                              
                            }
                        }   
                    }    
                }
            }
        }
    }
    """
    # Test query 
    test_order_query = """
    {
      orders(first: 5) {
        edges {
          node {
            id
            name
            email
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    sku
                  }
                }
              }
            }
          }
        }
      }
    }
    """
    try:
        result = client.execute_query(test_order_query)
        print("Products query successful!")
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"Error occurred: {str(e)}")

if __name__ == "__main__":
    main()