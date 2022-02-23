import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { searchBox, hits, pagination, refinementList } from 'instantsearch.js/es/widgets';

import resultHit from '../templates/result-hit';

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#hits',
        templates: {
          item: resultHit,
        },
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      hits({
      container: '#hits',
      templates: {
        item: (hit, bindEvent) => {
          const productURL =
           'product.html?objectID=' +
            hit.objectID +
            '&queryID=' +
            hit.__queryID;

            return `
              <a class="hit-card" href="${productURL}" ${bindEvent(
                'click',
                hit,
                'Search Result Clicked'
              )}>
                <div class="hit-content">
                  <img src="${hit.image}" alt="${hit.name}" />
                  <div class="hit-name">${hit._highlightResult.name.value}</div>
                </div>
              </a>
            `;
          },
        },
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),
      refinementList({
        container: '#pricerange-facet',
        attribute: 'price_range',
      }),
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    const insightsMiddleware = createInsightsMiddleware({
      insightsClient: aa,
    });
    
    this._searchInstance.use(insightsMiddleware);
    aa('setUserToken', 'demo-user');
    this._searchInstance.start();
  }
}

export default ResultPage;
