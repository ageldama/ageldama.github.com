


function resetSearchResults() {
    $('.search-results').empty();
    $('.search-loading-indicator').hide();
    $('main.list').fadeIn();
}

var showSearchResults_template = null;
function showSearchResults(searchTerm, searchResults) {
    $('.search-results').empty();
    $('.search-loading-indicator').hide();
    $('main.list').fadeOut();

    const $resultsContainer = $('.search-results');

    const templ = `
<h2>검색어(search term): <%= searchTerm %> /
<% if (searchResults.length === 0) { %>
    <span>--- 검색결과 없음 ---</span>
<% } else { %>
    <span>--- 검색결과: <%= searchResults.length %>건 ---</span>
<% } %>
</h2>

<% if (searchResults.length > 0) { %>
    <ol>
        <% searchResults.forEach(function(row, idx){ %>
            <li><a href="<%= row.permalink %>"><%= row.title %></a>
                <div><%= row.contents %></div></li>
        <% }); %>
    </ol>
<% } %>
`;

    if (!showSearchResults_template) {
        showSearchResults_template = _.template(templ);
    }

    const expanded = showSearchResults_template({
        searchTerm, searchResults,
    });

    $resultsContainer.append($(expanded));

    const mark = new Mark(document.querySelectorAll('.search-results'));
    mark.mark(searchTerm);
}


function searchTermMatch(searchTerm, str) {
    return _.toLower(_.toString(str)).indexOf(_.toLower(searchTerm)) > -1;
}

function executeSearch(searchTerm) {
    $('.search-loading-indicator').hide();

    const ts = document.querySelector('meta[name="hugo-gen-timestamp"]').content;

    fetch("/index.json?" + String(ts))
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            const filtered = _.filter(data, function(row) {
                return row && (searchTermMatch(searchTerm, row['title'])
                               || searchTermMatch(searchTerm, row['contents']));
            });
            // console.log(filtered);
            showSearchResults(searchTerm, filtered);
        })
}



$(function(){
    const $input = $('#search-query');
    $input.
        on('keyup', _.debounce(function() {
            const q = $input.val();
            // console.log('query: ' + q);
            if (_.isEmpty(q)) {
                resetSearchResults(q);
            } else {
                executeSearch(q);
            }
        }, 500));
});

