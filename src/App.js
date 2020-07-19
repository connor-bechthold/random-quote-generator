import React, { Component } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import randomInt from "random-int";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//State value for index of displayed quote
			quoteIndex: null,
			//State value for fetched array
			quotesArray: [],
			//Pre-written array for colours that will be used throughout the app
			colors: [
				"#FF3333",
				"#2fc2ff",
				"#00acee",
				"#ffa500",
				"#ff337b",
				"#565656",
				"#242424",
				"##7F00FF	",
			],
		};
	}

	componentDidMount() {
		//Fetch the data
		fetch(
			"https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json"
		)
			.then((data) => data.json())
			//Sets the quotesArray state to the data fetched
			.then((goodData) =>
				this.setState({ quotesArray: goodData }, () => {
					//Handles asynchronous behaviour and ensures that a random index is generated after quotes data is fetched
					this.setState({ quoteIndex: this.setQuoteIndex() });
				})
			);
	}
	//Method that returns a random index from the quotes array
	setQuoteIndex = () => {
		return randomInt(this.state.quotesArray.length - 1);
	};
	//Method that returns the quote object at the random index
	getQuote = () => {
		return this.state.quotesArray[this.state.quoteIndex];
	};
	//On the click of the new quote button, the quote index will randomly generate a new number
	clickHandler = () => {
		this.setState({ quoteIndex: this.setQuoteIndex() });
		this.setColor();
	};
	//Returns a random colour from the colors state
	setColor = () => {
		let index = randomInt(this.state.colors.length - 1);
		return this.state.colors[index];
	};
	render() {
		{
			/* Variable that stores the main colour being used in the app currently */
		}
		let newColor = this.setColor();
		return (
			<div className="App">
				<h1 className="title">Random Quote Generator</h1>
				<div id="quotebox">
					<div id="text">
						<p id="quote">
							<FontAwesomeIcon
								size="2x"
								icon={faQuoteLeft}
								className="faQuote"
								style={{ color: newColor }}
							/>
							{/* If the quote data exists, display the quote, otherwise display nothing */}
							{this.getQuote() ? this.getQuote().quoteText : ""}
						</p>
						<h4 id="author">
							{" "}
							-{" "}
							{/* If the quote data exists and the author property is empty, change it to unknown, display the author, otherwise display nothing */}
							{this.getQuote()
								? this.getQuote().quoteAuthor === ""
									? "Unknown"
									: this.getQuote().quoteAuthor
								: ""}
						</h4>{" "}
						<button
							onClick={this.clickHandler}
							className="btn btn-block btn-quote"
							style={{ backgroundColor: newColor, color: "white" }}
						>
							New Quote
						</button>
						<div className="center">
							<a
								className="twitter btn btn-primary"
								target="_blank"
								style={{ backgroundColor: newColor, borderColor: newColor }}
								href={`https://twitter.com/intent/tweet?text="${
									this.getQuote() ? this.getQuote().quoteText : ""
								}" - ${
									this.getQuote()
										? this.getQuote().quoteAuthor === ""
											? "Unknown"
											: this.getQuote().quoteAuthor
										: ""
								} (From Random Quote Generator by Connor Bechthold)`}
							>
								<FontAwesomeIcon icon={faTwitter} />
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
