
// TODO classize

/**
   sortListByData(document.querySelector('ul.terms'), 'descOrder', 'term', 'termType')

   sortListByData(document.querySelector('ul.terms'), 'count')

   sortListByData(document.querySelector('ul.terms'), 'lastModified')
*/
function sortListByData(elList, elControl, descDataKey, valDataKey, valDataTypeKey) {
    const cmpFns = {
        lexical: function(desc, a, b){
            let res = String(a).localeCompare(String(b));
            if(desc) res *= -1;
            return res;
        },

        numeric: function(desc, a_, b_){
            const a = Number(a_);
            const b = Number(b_);
            let res = 0;
            if(a<b) res = -1;
            else if(a>b) res = 1;
            if (desc)  res *= -1;
            return res;
        },
    };

    //
    const desc = 'true' === String(elControl.dataset[descDataKey]);
    const cmpFn = cmpFns[elControl.dataset[valDataTypeKey]];

    Array.from(elList.getElementsByTagName("LI"))
        .sort((a, b) => cmpFn(desc, a.dataset[valDataKey], b.dataset[valDataKey]))
        .forEach(li => elList.appendChild(li));
}

function doSortTerms(){
    const elList = document.querySelector('ul.terms');
    const elControl = document.querySelector('.sort-terms-control');
    const by = String(elControl.dataset['sortBy']);
    sortListByData(elList, elControl, 'descOrder', by, by + 'Type');
    applyToSortOrderIndicator(elControl);
}

function sortTermsBy(by){
    const el = document.querySelector('.sort-terms-control');
    const origSortBy = String(el.dataset['sortBy']);
    el.dataset['sortBy'] = by;
    if (origSortBy === String(by)){
        toggleDesc();
    }
    doSortTerms();
}

function toggleDesc(){
    const el = document.querySelector('.sort-terms-control');
    if(String(el.dataset['descOrder']) === 'true'){
        el.dataset['descOrder'] = 'false';
    }else{
        el.dataset['descOrder'] = 'true';
    }
}

function applyToSortOrderIndicator(elControl){
    // hide all
    document.querySelectorAll('.sort-order-indicator').forEach(i => i.style.display='none');

    // select one
    const kebabize = str => {
        return str.split('').map((letter, idx) => {
            return letter.toUpperCase() === letter
                ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
                : letter;
        }).join('');
    }

    const sortBy = kebabize(String(elControl.dataset['sortBy']));
    const desc = String(elControl.dataset['descOrder']) === 'true';
    const selector = ".sort-terms-btn.by-" + sortBy + " > .sort-order-indicator." + (desc ? "desc" : "asc");

    document.querySelectorAll(selector).forEach(el => el.style.display = 'inline');
}


applyToSortOrderIndicator(document.querySelector('.sort-terms-control'));
