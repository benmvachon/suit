// @flow

/**
 * A placement generated by the Attivio Business Center
 * that you can display along with search results.
 */
export default class SearchPlacement {
  static fromJson(json: any): SearchPlacement {
    const result = new SearchPlacement();
    result.label = json.label;
    result.imageUrl = json.imageUrl;
    result.linkText = json.linkText;
    result.linkUrl = json.linkUrl;
    result.markup = json.markup;
    return result;
  }

  /** The label to display */
  label: string;
  /** The URL of an image to display */
  imageUrl: string;
  /** The text to display for a hyperlink */
  linkText: string;
  /** The URL that should be the target of the hyperlink */
  linkUrl: string;
  /** HTML markup for the placement to be displayed as-is */
  markup: string;
}
