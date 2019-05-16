CREATE TABLE IF NOT EXISTS transactions (
	id text PRIMARY KEY NOT NULL,
	cardid text NOT NULL,
	chargetime timestamp NOT NULL,
	vendor text NOT NULL,
	value real NOT NULL,
	category text DEFAULT 'uncategorized' NOT NULL
);

CREATE TABLE IF NOT EXISTS budgets (
	category text PRIMARY KEY NOT NULL,
	budgetlimit real NOT NULL,
	timeframe text NOT NULL
);

CREATE TABLE IF NOT EXISTS vendorstocategories (
        vendor PRIMARY KEY text NOT NULL,
        category text NOT NULL
);


-- TRANSACTION FUNCTIONS --
/*
CREATE FUNCTION getAllTransactions() RETURNS TABLE (id text, cardid text, chargetime text, vendor text, value real, category text) AS $_$
	SELECT * FROM transactions
	$_$;

CREATE FUNCTION getAllUncategorizedTransactions() RETURNS TABLE (id text, cardid text, chargetime text, vendor text, value real, category text) AS $_$
	SELECT * FROM transactions WHERE category = 'uncategorized'
	$_$;

CREATE FUNCTION getAllTransactionsInCategory(cat) RETURNS TABLE (id text, cardid text, chargetime text, vendor text, value real, category text) AS $_$
	SELECT * FROM transactions WHERE category = cat
	$_$;

CREATE FUNCTION getAllTransactionsAfterDate(timelimit) RETURNS TABLE (id text, cardid text, chargetime text, vendor text, value real, category text) AS $_$
	SELECT * FROM transactions WHERE chargetime > timelimit
	$_$;

CREATE FUNCTION addTransaction(id text, cardid text, chargetime text, vendor text, value real, category text) RETURNS void AS $_$
	INSERT INTO transactions(id text, cardid text, chargetime text, vendor text, value real, category text) VALUES ($1, $2, $3, $4, $5, $6)
	$_$;

CREATE FUNCTION modifyTransaction(id text, cardid text, chargetime text, vendor text, value real, category text) RETURNS void AS $_$
	UPDATE transactions SET cardid = $2, chargetime = $3, vendor = $4, value = $5, category = $6 WHERE id = $1
	$_$;
*/


-- BUDGET FUNCTIONS --
/*
CREATE FUNCTION getAllBudgetCategories() RETURNS TABLE (category text, budgetlimit real, timeframe text) AS $_$
	SELECT * FROM budgets
	$_$;

CREATE FUNCTION addBudgetCategory(category text, budgetlimit real, timeframe text) AS $_$
	INSERT INTO budgets(category text, budgetlimit real, timeframe text) VALUES ($1, $2, $3)
	$_$;

CREATE FUNCTION modifyBudgetCategory(category text, budgetlimit real, timeframe text) AS $_$
	UPDATE budgets SET budgetlimit = $2, timeframe = $3 WHERE category = $1
	$_$;
*/
