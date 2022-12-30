
    connectedCallback(){
        let bookSeriesId = localStorage.getItem('seriesid');
        getBooksFromSeries({
            bookSeriesId: bookSeriesId
        }).then(series => {
            this.seriesBooks = series;
        })
    }
}