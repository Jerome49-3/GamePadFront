import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer>
        <div className="wrapper">
          <ul className="boxLinkFooter">
            <li>
              <p>Made at
                <span>
                  <a
                    href="https://www.lereacteur.io/?utm_source=google&utm_medium=cpc&utm_campaign=FR-SN-Brand&utm_term=le%20r%C3%A9acteur&utm_content=377851505166&gad_source=1&gclid=CjwKCAjwx-CyBhAqEiwAeOcTde7EsCCHrpdDqUq2K3hFx24fxIMDKq0FZtDolDxM3NAtCfAZggCxmRoCJuAQAvD_BwE"> Le
                    Reacteur</a>
                </span> by <span><a href="https://github.com/Jerome49-3">Jerome Bobin</a></span>  2024</p>
            </li>
            <li>powered by<Link to='https://rawg.io/'>Rawg API</Link></li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Footer