const Layout = ({ children }) => {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-purple-600 text-white py-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">InterDimensional Comedy</h1>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    );
  };
  
  export default Layout;
  