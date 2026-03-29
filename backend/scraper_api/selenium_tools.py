import os
import time
from typing import Dict, Any, Optional

from google.adk.tools import BaseTool
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
# from google.adk.tool import Tool


# Initialize WebDriver
def get_driver():
    if os.getenv("DISABLE_WEB_DRIVER") == "1":
        return None

    chrome_options = Options()
    if os.getenv("HEADLESS", "0") == "1":
        chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


_driver = None


def driver():
    global _driver
    if _driver is None:
        _driver = get_driver()
    return _driver


class GoToUrl(BaseTool):
    """Tool to navigate to a URL."""

    description = "Navigate to a specified URL"

    def __call__(self, url: str) -> str:
        """Navigate to the specified URL."""
        if driver() is None:
            return "WebDriver is disabled."

        driver().get(url)
        return f"Navigated to {url}"


class TakeScreenshot(BaseTool):
    """Tool to take a screenshot of the current page."""

    description = "Take a screenshot of the current page"

    def __call__(self, tool_context: Dict[str, Any], file_name: str = "screenshot.png") -> str:
        """Take a screenshot and save it to the specified file."""
        if driver() is None:
            return "WebDriver is disabled."

        screenshot_path = file_name
        driver().save_screenshot(screenshot_path)

        # Register the screenshot as an artifact
        tool_context["artifact_paths"].append(screenshot_path)

        return f"Screenshot saved to {screenshot_path}"


class FindElementWithText(BaseTool):
    """Tool to find an element containing specific text."""

    description = "Find an element on the page containing specific text"

    def __call__(self, text_pattern: str) -> str:
        """Find an element containing the specified text pattern."""
        if driver() is None:
            return "WebDriver is disabled."

        try:
            element = driver().find_element(By.XPATH, f"//*[contains(text(),'{text_pattern}')]")
            return f"Found element with text: {text_pattern}"
        except Exception as e:
            return f"Element with text '{text_pattern}' not found: {str(e)}"


class ClickElementWithText(BaseTool):
    """Tool to click an element containing specific text."""

    description = "Click an element containing specific text"

    def __call__(self, text_pattern: str) -> str:
        """Click an element containing the specified text pattern."""
        if driver() is None:
            return "WebDriver is disabled."

        try:
            element = driver().find_element(By.XPATH, f"//*[contains(text(),'{text_pattern}')]")
            element.click()
            return f"Clicked element with text: {text_pattern}"
        except Exception as e:
            return f"Failed to click element with text '{text_pattern}': {str(e)}"


class EnterTextIntoElement(BaseTool):
    """Tool to enter text into an element."""

    description = "Enter text into an element identified by its ID"

    def __call__(self, text_to_enter: str, element_id: str, press_enter: bool = True) -> str:
        """Enter text into the specified element."""
        if driver() is None:
            return "WebDriver is disabled."

        try:
            element = driver().find_element(By.ID, element_id)
            element.clear()
            element.send_keys(text_to_enter)

            if press_enter:
                element.send_keys(Keys.RETURN)

            return f"Entered text '{text_to_enter}' into element with ID '{element_id}'"
        except Exception as e:
            return f"Failed to enter text into element with ID '{element_id}': {str(e)}"


class ScrollDown(BaseTool):
    """Tool to scroll down the page."""

    description = "Scroll down the page"

    def __call__(self, amount: int = 500) -> str:
        """Scroll down by the specified amount of pixels."""
        if driver() is None:
            return "WebDriver is disabled."

        driver().execute_script(f"window.scrollBy(0, {amount});")
        return f"Scrolled down by {amount} pixels"


class GetPageSource(BaseTool):
    """Tool to get the page source."""

    description = "Get the HTML source of the current page"

    def __call__(self, limit: int = 10000) -> str:
        """Get the HTML source of the current page, limited to a specified number of characters."""
        if driver() is None:
            return "WebDriver is disabled."

        page_source = driver().page_source

        if len(page_source) > limit:
            return page_source[:limit] + "... (truncated)"

        return page_source


class AnalyzeWebpageAndDetermineAction(BaseTool):
    """Tool to analyze a webpage and determine actions to take."""

    description = "Analyze a webpage and determine actions to achieve a specific task"

    def __call__(self, user_task: str) -> str:
        """
        Analyze the current webpage and determine actions to achieve the specified task.

        Args:
            user_task: The task to achieve (e.g., "Find the top 3 products for running shoes")

        Returns:
            A set of recommended actions to take
        """
        if driver() is None:
            return "WebDriver is disabled."

        # Get the page source
        page_source = driver().page_source

        # You would typically use an LLM to analyze the page here
        # For this example, we'll return a simple response
        return f"Page analyzed. To achieve '{user_task}', I recommend the following actions:\n" + \
            "1. Identify main product elements on the page\n" + \
            "2. Extract product titles from the top results\n" + \
            "3. Return the top product titles in a structured format"