import React, { Component } from 'react'
import { extend } from 'lodash'
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit'

// const host = "http://admin:elasticFence@localhost:9200/elastic_digital"

// const searchkit = new SearchkitManager(host);

const sk = new SearchkitManager("http://46.101.124.85:9200/elastic_digital", {
  basicAuth:"admin:elasticFence"
})


const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  const source:any = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("details")}>
      {source.companyName && source.companyName.typeValues && <h2 className={bemBlocks.item("companyName.typeValues")} dangerouslySetInnerHTML={{__html:source.companyName.typeValues}}></h2>}
      </div>
    </div>
  )
}

class SearchBar extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={sk}>
        <Layout>
          <TopBar>
            <SearchBox autofocus={true} searchOnChange={true} prefixQueryFields={["industry.typeValues"]}/>
          </TopBar>

        <LayoutBody>
          <LayoutResults>
            <ViewSwitcherHits
                hitsPerPage={12}
                hitComponents={[
                  {key:"list", title:"List", itemComponent:MovieHitsListItem}
                ]}
                scrollTo="body"
            />
          </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default SearchBar;
