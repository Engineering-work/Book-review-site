public class BookListTriggerHelper {
    public static void addSimilarBooks(List<Book_List_Item__c> newBookListItems) {
        Set<Id> bookIds = getBookIds(newBookListItems);
        List<Book__c> booksOnLists = [SELECT Id, Name, Genre__c FROM Book__c WHERE Id IN :bookIds];
        Map<Id, List<Book__c>> bookwormUserIdToBooksOnLists = new Map<Id, List<Book__c>>();

        for (Book__c book : booksOnLists) {
            for (Book_List_Item__c bookListItem : newBookListItems) {
                if (bookListItem.Book__c == book.Id) {
                    if (bookwormUserIdToBooksOnLists.containsKey(bookListItem.User__c)) {
                        List<Book__c> appendedBookList = bookwormUserIdToBooksOnLists.get(BookListItem.User__c);
                        appendedBookList.add(book);
                        bookwormUserIdToBooksOnLists.put(bookListItem.User__c, appendedBookList);
                    } else {
                        bookwormUserIdToBooksOnLists.put(bookListItem.User__c, new List<Book__c>{ book });
                    }
                }
            }
        }

        Map<Id, List<String>> bookwormUserIdToGenres = getUsersToGenres(bookwormUserIdToBooksOnLists);
        List<Book_Suggestion__c> bookSuggestions = createBookSuggestions(bookwormUserIdToGenres, bookwormUserIdToBooksOnLists);

        insertBookSuggestions(bookSuggestions);
    }

    public static Set<Id> getBookIds(List<Book_List_Item__c> newBookListItems) {
        Set<Id> bookIds = new Set<Id>();
        for (Book_List_Item__c bookListItem : newBookListItems) {
            bookIds.add(bookListItem.Book__c);
        }

        return bookIds;
    }

    public static Map<Id, List<String>> getUsersToGenres(Map<Id, List<Book__c>> bookwormUserIdToBooksOnLists) {
        Map<Id, List<String>> bookwormUserIdToGenres = new Map<Id, String[]>();
        for (Id bookwormUserId : bookwormUserIdToBooksOnLists.keySet()) {
            for (Book__c book : bookwormUserIdToBooksOnLists.get(bookwormUserId)) {
                List<String> genres = book.Genre__c.split(';');
                if (bookwormUserIdToGenres.containsKey(bookwormUserId)) {
                    List<String> appendedGenresList = bookwormUserIdToGenres.get(bookwormUserId);
                    appendedGenresList.addAll(genres);
                    bookwormUserIdToGenres.put(bookwormUserId, appendedGenresList);
                } else {
                    bookwormUserIdToGenres.put(bookwormUserId, genres);
                }
            }
        }

        return bookwormUserIdToGenres;
    }

    public static List<Book_Suggestion__c> createBookSuggestions(Map<Id, List<String>> bookwormUserIdToGenres, Map<Id, List<Book__c>> bookwormUserIdToBooksOnLists) {
        String allUsersGenres = getAllUsersGenres(bookwormUserIdToGenres.values());

        List<Book__c> booksByGenre = [SELECT Id, Title__c, Genre__c FROM Book__c WHERE Genre__c INCLUDES (:allUsersGenres)];
        List<Book_Suggestion__c> usersSuggestions = [SELECT Id, Book__c, User__c FROM Book_Suggestion__c WHERE User__c IN :bookwormUserIdToGenres.keySet() ORDER BY User__c];
        List<Book_List_Item__c> booksAlreadyOnMyLists = [
            SELECT Id, Book__c, User__c
            FROM Book_List_Item__c
            WHERE User__c IN :bookwormUserIdToBooksOnLists.keySet()
            ORDER BY User__c
        ];

        List<Book_Suggestion__c> newSuggestions = new List<Book_Suggestion__c>();

        for (Book__c book : booksByGenre) {
            for (Id bookwormUserId : bookwormUserIdToGenres.keySet()) {
                for (String genre : bookwormUserIdToGenres.get(bookwormUserId)) {
                    List<String> bookGenres = book.Genre__c.split(';');
                    if (bookGenres.contains(genre) && shouldSuggestBookToUser(book.Id, bookwormUserId, usersSuggestions, booksAlreadyOnMyLists)) {
                        Book_Suggestion__c bookSuggestion = new Book_Suggestion__c(Book__c = book.Id, User__c = bookwormUserId);
                        newSuggestions.add(bookSuggestion);
                        usersSuggestions.add(bookSuggestion);
                    }
                }
            }
        }

        removeBooksAddedToListsFromSuggestions(usersSuggestions, bookwormUserIdToBooksOnLists);
        return newSuggestions;
    }

    public static String getAllUsersGenres(List<List<String>> genresByUser) {
        List<String> allUsersGenres = new List<String>();
        for (List<String> userGenres : genresByUser) {
            for (String singleGenre : userGenres) {
                allUsersGenres.add(singleGenre);
            }
        }
        return String.join(allUsersGenres, ';');
    }

    public static Boolean shouldSuggestBookToUser(Id bookId, Id bookwormUserId, List<Book_Suggestion__c> usersSuggestions, List<Book_List_Item__c> booksAlreadyOnMyList) {
        for (Book_Suggestion__c existingSuggestion : usersSuggestions) {
            if (existingSuggestion.User__c == bookwormUserId && existingSuggestion.Book__c == bookId) {
                return false;
            }
        }
        for (Book_List_Item__c bookOnList : booksAlreadyOnMyList) {
            if (bookOnList.User__c == bookwormUserId && bookOnList.Book__c == bookId) {
                return false;
            }
        }
        return true;
    }

    public static List<Book_Suggestion__c> removeBooksAddedToListsFromSuggestions(List<Book_Suggestion__c> bookSuggestions, Map<Id, List<Book__c>> bookwormUserIdToBooksOnLists) {
        List<Book_Suggestion__c> suggestionsToRemove = new List<Book_Suggestion__c>();

        for (Id bookwormUserId : bookwormUserIdToBooksOnLists.keySet()) {
            for (Book__c book : bookwormUserIdToBooksOnLists.get(bookwormUserId)) {
                for (Book_Suggestion__c suggestion : bookSuggestions) {
                    if (book.Id == suggestion.Book__c) {
                        suggestionsToRemove.add(suggestion);
                    }
                }
            }
        }

        try {
            delete suggestionsToRemove;
            return suggestionsToRemove;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }

    public static List<Book_Suggestion__c> insertBookSuggestions(List<Book_Suggestion__c> bookSuggestions) {
        try {
            insert bookSuggestions;
            return bookSuggestions;
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        return null;
    }
}
