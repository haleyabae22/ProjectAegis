import requests
from bs4 import BeautifulSoup

class ScrapeUrl:
    def __init__(self):
        self.__name__ = "url_scrape_tool"

    def __call__(self, url: str) -> str:
        """
        Fetches the content of a target URL and parses the HTML to extract readable text.
        """
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }

        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.extract()

            text = soup.get_text(separator=' ', strip=True)

            # Limit to 4k characters to prevent overwhelming the LLM
            if len(text) > 4000:
                text = text[:4000] + "... [Text truncated]"

            return text
        except Exception as e:
            return f"Error scraping URL {url}: {str(e)}"

