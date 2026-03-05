import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <section className="relative overflow-hidden py-8 sm:py-10 bg-slate-50/80 border-t border-gray-200 mt-auto backdrop-blur-sm">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex flex-col justify-between h-full">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="50px" />
                                <span className="ml-3 text-2xl font-bold text-slate-800">MegaBlog</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    &copy; Copyright 2026. All Rights Reserved by MegaBlog.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="tracking-wider mb-4 sm:mb-6 text-xs font-semibold uppercase text-gray-500">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Affiliate Program
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Press Kit
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="tracking-wider mb-4 sm:mb-6 text-xs font-semibold uppercase text-gray-500">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Help
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Customer Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legals */}
                    <div>
                        <h3 className="tracking-wider mb-4 sm:mb-6 text-xs font-semibold uppercase text-gray-500">
                            Legals
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-1 inline-block" to="/">
                                    Licensing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer