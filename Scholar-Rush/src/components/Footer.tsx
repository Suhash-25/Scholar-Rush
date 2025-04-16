
export function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-scholarship-primary text-white mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">ScholarRush</h3>
            <p className="text-white/70 text-sm">
              A decentralized scholarship platform connecting students with funding through blockchain technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Technologies</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Base Blockchain</li>
              <li>Stellar Network</li>
              <li>Groq LLM API</li>
              <li>React + TypeScript</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="https://docs.base.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">Base Documentation</a></li>
              <li><a href="https://stellar.org/developers" target="_blank" rel="noopener noreferrer" className="hover:text-white">Stellar Developers</a></li>
              <li><a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Groq Console</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/20 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} ScholarRush. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
