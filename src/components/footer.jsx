import Image from "next/image";
export function Footer() {
    return (
      <footer className="bg-black z-50 relative bottom-0 w-full border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
             <Image src="/LOGOBG.png" alt="ExamChain" width={100} height={100} className="mb-4"/>
              <p className="text-muted-foreground mb-4 max-w-md">
                Revolutionizing academic assessment with blockchain-powered security, transparent evaluation, and seamless
                accreditation support.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-background">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-background">
                  Terms of Service
                </a>
              </div>
            </div>
  
            <div>
              <h4 className="text-sm font-semibold text-background mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-background">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-muted-foreground hover:text-background">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-muted-foreground hover:text-background">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-background">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
  
            <div>
              <h4 className="text-sm font-semibold text-background mb-4">Contact Info</h4>
              <ul className="space-y-2 text-secondary">
                <li>support@examchain.edu</li>
                <li>+1 (555) 123-4567</li>
                <li>
                  123 Education Ave
                  <br />
                  Tech City, TC 12345
                </li>
              </ul>
            </div>
          </div>
  
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-secondary">
              © 2025 ExamChain. All rights reserved. Powered by blockchain technology.
            </p>
          </div>
        </div>
      </footer>
    )
  }
  