import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Erreur capturée par ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: "center", color: "#dc2626", marginTop: 110 }}>
          <h2>Une erreur est survenue</h2>
          <p style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
            {this.state.error.toString()}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
